/**
 * Tree Model
 * @author Wang Jianchao(tinyking)
 * @version 1.0
 * @since 2020/2/27
 */
export class TreeNode {
  code: string;
  children: TreeNode[];
  name: string;
  data: TreeType;
  level: number;
  root: boolean;
  leaf: boolean;
}

export class TreeFlatNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public level: number,
    public root: boolean,
    public leaf: boolean,
    public code: string,
    public data: TreeType
  ) {}
}

export interface TreeType {
  code: string;
  name: string;
  parentCode: string;
  leaf: boolean;
  seq: number;
}

/**
 * compare with seq
 * @param a one element
 * @param b another element
 */
export function compareFnTreeType(a: TreeType, b: TreeType) {
  return a.seq - b.seq;
}
