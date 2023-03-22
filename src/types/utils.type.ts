// kiểu dữ liệu giống fc

export interface resPonseApi<Data> {
  message: string
  data?: Data
}

// khử underfined
export type NonUnderfile<t> = {
  [p in keyof t]-?: NonUnderfile<NonNullable<t[p]>>
}
