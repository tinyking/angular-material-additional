/* tslint:disable:variable-name */
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Observable, of } from 'rxjs';
import { TreeFlatNode, TreeNode, TreeType } from './tree.model';
import { buildTree } from './utils';

@Component({
  selector: 'ngmat-drag-tree',
  templateUrl: './drag-tree.component.html',
  styleUrls: ['./drag-tree.component.scss']
})
export class DragTreeComponent implements OnInit {
  @Input() rootName: string;
  @Input() extra: TemplateRef<any>;
  @Input() displayWith: (node: TreeFlatNode) => string;
  @Output() dragDropped: EventEmitter<any> = new EventEmitter<any>();

  treeControl: FlatTreeControl<TreeFlatNode>;
  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;

  selected: TreeFlatNode;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<TreeFlatNode>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit(): void {}

  private _getLevel = (node: TreeFlatNode) => node.level;
  private _isExpandable = (node: TreeFlatNode) => node.expandable;
  private _getChildren = (node: TreeNode): Observable<TreeNode[]> =>
    of(node.children);
  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  transformer(node: TreeNode, level: number) {
    return new TreeFlatNode(
      !!node.children && node.children.length > 0,
      node.name,
      level,
      node.root,
      node.leaf,
      node.code,
      node.data
    );
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart(node: TreeFlatNode) {
    this.dragging = true;
    if (
      this.treeControl.isExpandable(node) &&
      this.treeControl.isExpanded(node)
    ) {
      // this.treeControl.collapse(node);
      setTimeout(() => {
        this.treeControl.collapse(node);
      });
    }
  }

  dragEnd() {
    this.dragging = false;
  }

  dragHover(node: TreeFlatNode) {
    if (this.dragging) {
      // clearTimeout(this.expandTimeout);
      // this.expandTimeout = setTimeout(() => {
      //   this.treeControl.expand(node);
      // }, this.expandDelay);
    }
  }

  dragHoverEnd() {
    // if (this.dragging) {
    //   clearTimeout(this.expandTimeout);
    // }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(
      this.treeControl.dataNodes,
      Array.from(this.expandedNodeSet)
    );
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<TreeFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach(node => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.code);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<TreeFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach(nodeId => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find(n => n.code === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: TreeFlatNode[], codes: string[]) {
    if (!flatNodes || flatNodes.length === 0) {
      return;
    }
    const idSet = new Set(codes);
    return flatNodes.forEach(node => {
      if (idSet.has(node.code)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: TreeFlatNode): TreeFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  drop2(event: CdkDragDrop<any, any>) {
    console.log(event);
    const flatNode: TreeFlatNode = event.item.data;
    this.expandedNodeSet.delete(flatNode.code);
    const visibleNodes = this.findVisibleNodes(flatNode.code);

    const currentIndex = event.currentIndex;

    const dtnSource: TreeType = flatNode.data;
    if (currentIndex < visibleNodes.length) {
      const distNext = visibleNodes[currentIndex];
      if (!distNext.code) {
        return;
      }
      dtnSource.parentCode = distNext.data.parentCode;
      if (currentIndex === 0) {
        dtnSource.seq = distNext.data.seq / 2;
      } else {
        const distPrev = visibleNodes[currentIndex - 1];
        if (distPrev.data) {
          if (distNext.data.parentCode === distPrev.data.parentCode) {
            dtnSource.seq = (distPrev.data.seq + distNext.data.seq) / 2;
          } else {
            if (distPrev.level < distNext.level) {
              dtnSource.parentCode = distNext.data.parentCode;
              dtnSource.seq = distNext.data.seq / 2;
            } else {
              dtnSource.parentCode = distPrev.data.parentCode;
              dtnSource.seq = distPrev.data.seq + 2000;
            }
          }
        } else {
          dtnSource.seq = distNext.data.seq / 2;
        }
      }
    } else {
      const distPrev = visibleNodes[currentIndex - 1];
      if (distPrev.data) {
        dtnSource.parentCode = distPrev.data.parentCode;
        dtnSource.seq = distPrev.data.seq + 2000;
      } else {
        dtnSource.parentCode = undefined;
        dtnSource.seq = 2000;
      }
    }
    this.dragDropped.emit(dtnSource);
  }

  private findVisibleNodes(code: string): TreeNode[] {
    const treeControl = this.treeControl;

    function recursion(arr: TreeNode[], skipCode: string): TreeNode[] {
      const result: TreeNode[] = [];
      arr.forEach(it => {
        if (it.code === skipCode) {
          return;
        }
        result.push(it);
        if (!it.children) {
          return;
        }
        const flatNode = treeControl.dataNodes.find(
          node => node.code === it.code
        );
        if (!treeControl.isExpanded(flatNode)) {
          return;
        }
        result.push(...recursion(it.children, skipCode));
      });
      return result;
    }

    return recursion(this.dataSource.data, code);
  }

  public refresh(data: TreeType[]) {
    this.rebuildTreeForData(buildTree(this.rootName, data));
  }

  getText(node: TreeFlatNode) {
    return this.displayWith ? this.displayWith(node) : node.name;
  }
}
