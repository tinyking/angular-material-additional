/**
 *
 * @author Wang Jianchao(tinyking)
 * @version 1.0
 * @since 2020/2/27
 */
import { TreeNode, TreeType } from './tree.model';

/**
 * compare with seq
 * @param a one element
 * @param b another element
 */
export function compareFnTreeType(a: TreeType, b: TreeType) {
  return a.seq - b.seq;
}

export function buildTree(rootName: string, data: TreeType[]): TreeNode[] {
  const nodes: TreeNode[] = [];
  if (rootName) {
    const tree = new TreeNode();
    tree.root = true;
    tree.name = rootName;
    tree.leaf = false;
    tree.level = 0;
    tree.children = buildTreeChildren(data, 1, it => !it.parentCode);
    nodes.push(tree);
  } else {
    nodes.push(...buildTreeChildren(data, 0, it => !it.parentCode));
  }
  return nodes;
}

/**
 * 构建符合filter的所有子节点。
 *
 * @param data TreeType[] 原始数据集
 * @param level number 构建的节点层级，从0开始，level值随Tree的深度递增
 * @param filter Fn 匿名回调函数，用于从原数据集中过滤当前需要构建树节点的数据
 */
function buildTreeChildren(
  data: TreeType[],
  level: number,
  filter: (treeType: TreeType) => boolean
) {
  return data
    .filter(it => filter(it))
    .sort(compareFnTreeType)
    .reduce<TreeNode[]>((accumulator, item) => {
      const node = new TreeNode();
      node.code = item.code;
      node.root = false;
      node.name = item.name;
      node.leaf = item.leaf;
      node.level = level;
      node.data = item;
      node.children = this.buildTreeChildren(
        data,
        level + 1,
        it => it.parentCode === node.code
      );
      return accumulator.concat(node);
    }, []);
}
