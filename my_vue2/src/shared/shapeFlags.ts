
export const enum shapeFlags {
  ELEMENT = 1,                    //1 000001
  FUNCTIONAL_COMPONENT = 1 << 1, // 2 000010
  STATEFUL_COMPONENT = 1 << 2, // 4   000100
  TEXT_CHILDREN = 1 << 3, // 8        001000
  ARRAY_CHILDREN = 1 << 4, // 16      010000
}
