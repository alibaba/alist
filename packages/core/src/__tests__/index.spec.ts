import createList from '../index'

describe('createList', () => {
    test('base', () => {
      const actions = createList()
      const apiList = [
        "notify",
        "subscribe",
        "unSubscribe",
        "on",
        "removeListener",
        "refresh",
        "setLoading",
        "getLoading",
        "setValidateConfig",
        "getValidateConfig",                        
        "setUrl",
        "getUrl",               
        "setQuery",
        "getParams",
        "setParams",
        "getFilterEffects",
        "search",
        "clear",
        "reset",
        "setCurrentPage",
        "setPageSize",
        "getSelectionConfig",
        "setSelectionConfig",
        "disableSelectionConfig",
        "getSelections",
        "getEmptyStatus",
        "getTableProps",
        "setTableProps",
        "setPaginationDataSource",
        "getPaginationDataSource",
        "getSortConfig",
        "setSortConfig",
        "getMode",
        "getPageData",
        "setPageData",
        "getFilterData",
        "setFilterData",
        "getFilterProps",
        "getFilterInstance",
        "setFilterInstance",
        "setFormState",
        "getFormState",
        "setFieldState",
        "getFieldState",
        "getDataSource",
        "setDataSource",        
        "getMultipleData",
        "setMultipleData",
        "setMultiplePageSize",
        "getExpandStatus",
        "toggleExpandStatus",
        "appendMirrorFilterInstance",
        "getMirrorFilterInstanceList",
        "initSyncFilterData",
        "setResponseData",
        "getResponseData",
        "getAllColumns",
        "setAllColumns",
        "setColumns",
        "getColumns",
        "setEmptyStatus",
        "hasSetColumns"
      ]
      expect(Object.keys(actions)).toEqual(apiList)
    })
})

describe('lifecycles', () => {
  test('lifecycles', () => {
  })
})

describe('pagination', () => {
  test('get pagination', () => {
    const actions = createList()
    const pageData = actions.getPageData()
    expect(pageData).toEqual({
      pageSize: 10,
      currentPage: 1,
      total: 0,
      totalPages: 0
    })
  })

  test('set pagination', () => {
    const actions = createList()
    const data = {
      pageSize: 10,
      currentPage: 2,
      total: 50,
    }
    actions.setPageData(data)
    const pageData = actions.getPageData()
    expect(pageData).toEqual({
      ...data,
      totalPages: 0
    })
  })

  test('set currentPage', () => {
  })
})

describe('on', () => {
  test('on', () => {
  })
})

describe('dataSource', () => {
  test('get dataSource', () => {
    const actions = createList()
    const dataSource = actions.getDataSource()
    expect(dataSource).toEqual([])
  })

  test('set dataSource', () => {
    const actions = createList()
    const data = [{ id: 1, data: 1 }, { id: 2, data: 2 }]
    actions.setDataSource(data)
    const dataSource = actions.getDataSource()
    expect(dataSource).toEqual(data)
  })
})

describe('multipleData', () => {
  test('get multipleData', () => {
    const actions = createList()
    const multipleData = actions.getMultipleData()
    expect(multipleData).toEqual({})
  })

  test('set multipleData', () => {
    const actions = createList()
    const data = { list1: [], list2: [] }
    actions.setMultipleData(data)
    const multipleData = actions.getMultipleData()
    expect(multipleData).toEqual({
      "list1":  {
        "currentPage": 1,
        "dataList": [],
        "pageSize": 10,
        "paginationDataList": [],
        "total": 0,
        "totalPages": 0,
      },
      "list2":  {
        "currentPage": 1,
        "dataList": [],
        "pageSize": 10,
        "paginationDataList": [],
        "total": 0,
        "totalPages": 0,
      }
  })
  })
})

describe('clear', () => {
  test('clear', () => {
    
  })
})

describe('reset', () => {
  test('reset', () => {
    
  })
})

describe('refresh', () => {
  test('refresh', () => {
    
  })
})

describe('search', () => {
  test('search', () => {
    
  })
})

describe('setLoading', () => {
  test('setLoading', () => {
    
  })
})

describe('setUrl', () => {
  test('setUrl', () => {
    
  })
})

describe('setQuery', () => {
  test('setQuery', () => {
    
  })
})

describe('params', () => {
  test('get params', () => {
    
  })

  test('set params', () => {
    
  })
})

describe('filterData', () => {
  test('get filterData', () => {
    const actions = createList()
    const filterData = actions.getFilterData()
    expect(filterData).toEqual({})
  })

  test('set filterData', () => {
    // const actions = createList()
    // const data = { username: 'abc' }
    // actions.setFilterData(data)
    // const filterData = actions.getFilterData()
    // expect(filterData).toEqual(data)
  })
})
