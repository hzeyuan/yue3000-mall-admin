import _ from 'lodash'

// 2个数组多对多匹配
export function multiply (arr1, arr2){
  //传入的情况有2种
// 第一次传值 2个都是一维数组
// 第二次传值 和第N次 一个二维数组 一个是一维数组

  let arr = []
  let a = arr1.length
  let b = arr2.length
  if (!Array.isArray(arr1[0])) {
    // 此处为第一次传入判断 判断是否为二维数组
    // 两个一维数组之间的匹配
    for (let i = 0;i < a;i++) {
      for (let j = 0;j < b; j++) {
        arr.push([arr1[i],arr2[j]])
      }
    }
  } else {
    // 非第一次传入
    // 二维数组与一维数组的匹配 二维数组的每项扩展一个一个子项
    for (let i = 0;i < a;i++) {
      for (let j = 0;j < b; j++) {
        arr.push([...arr1[i],arr2[j]])
      }
    }
  }
  return arr
}

// 2个数组互相比较 数组1中和数组2中相同项使用数组2  相同项为数组中某一元素
export function arrMultiply (arr1, arr2) {
  const products=  _.cloneDeep(arr2)
  for (let i = 0;i < arr1.length; i++) {
    products.forEach((item) => {
      if (_.isEqual(item.specifications, arr1[i].specifications)) {
        arr1[i] =item
      }
    })
  }
  return arr1
}


export function getSpecifications (arr){
  // arr[{'':[]}]--->arr[{'':''}]
  let specifications=[]
  arr.forEach((item) => {
    item.value.forEach((iteming) =>{
      specifications.push({
        specification: item.specification,
        value: iteming,
        pic_url: item.pic_url
      })
    })
  })
  return specifications
}

export function setSpecifications (arr) {
  // arr[{'':''}]--->arr[{'':[]}]
  let specifications=[]
  return specifications
}
