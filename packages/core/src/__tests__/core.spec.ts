import List from '../model/core'

describe('new List', () => {
    test('base', () => {
        // const core = new List()        
    })

    test('dataSource mode', () => {
      
    })

    test('url mode', () => {
      
    })

    test('query mode', () => {
      
    })

    test('default params', () => {
      
    })

    test('default method', () => {
      
    })

    test('formatFilter', () => {
      
    })

    test('formatBefore', () => {
      
    })

    test('formatAfter', () => {
      
    })
})

describe('lifecycles', () => {
  test('lifecycles', () => {
  })
})

describe('pagination', () => {
  test('get pagination', () => {
    const core = new List()
    const pageData = core.getPageData()
    expect(pageData).toEqual({
      pageSize: 10,
      currentPage: 1,
      total: 0,
      totalPages: 0,
    })
  })

  test('set pagination', () => {
    const core = new List()
    const data = {
      pageSize: 10,
      currentPage: 2,
      total: 50,      
    }
    core.setPageData(data)
    const pageData = core.getPageData()
    expect(pageData).toEqual({
      ...data,
      totalPages: 0,
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
    const core = new List()
    const dataSource = core.getDataSource()
    expect(dataSource).toEqual([])
  })

  test('set dataSource', () => {
    const core = new List()
    const data = [{ id: 1, data: 1 }, { id: 2, data: 2 }]
    core.setDataSource(data)
    const dataSource = core.getDataSource()
    expect(dataSource).toEqual(data)
  })
})

describe('multipleData', () => {
  test('get multipleData', () => {
    const core = new List()
    const multipleData = core.getMultipleData()
    expect(multipleData).toEqual({})
  })

  test('set multipleData', () => {
    const core = new List()
    const data = { list1: [], list2: [] }
    core.setMultipleData(data)
    const multipleData = core.getMultipleData()
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
    const core = new List()
    const filterData = core.getFilterData()
    expect(filterData).toEqual({})
  })

  test('set filterData', () => {
    // const core = new List()
    // const data = { username: 'abc' }
    // core.setFilterData(data)
    // const filterData = core.getFilterData()
    // expect(filterData).toEqual(data)
  })
})
