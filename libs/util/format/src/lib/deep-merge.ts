export function deepMerge(target: any, source: any) {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], deepMerge(target[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}
// function isMergeableObject(val) {
//   var nonNullObject = val && typeof val === 'object'

//   return (
//     nonNullObject &&
//     Object.prototype.toString.call(val) !== '[object RegExp]' &&
//     Object.prototype.toString.call(val) !== '[object Date]'
//   )
// }

// function emptyTarget(val) {
//   return Array.isArray(val) ? [] : {}
// }

// function cloneIfNecessary(value, optionsArgument) {
//   var clone = optionsArgument && optionsArgument.clone === true
//   return clone && isMergeableObject(value)
//     ? deepMerge(emptyTarget(value), value, optionsArgument)
//     : value
// }

// function defaultArrayMerge(target, source, optionsArgument) {
//   var destination = target.slice()
//   source.forEach(function (e, i) {
//     if (typeof destination[i] === 'undefined') {
//       destination[i] = cloneIfNecessary(e, optionsArgument)
//     } else if (isMergeableObject(e)) {
//       destination[i] = deepMerge(target[i], e, optionsArgument)
//     } else if (target.indexOf(e) === -1) {
//       destination.push(cloneIfNecessary(e, optionsArgument))
//     }
//   })
//   return destination
// }

// function mergeObject(target, source, optionsArgument) {
//   var destination = {}
//   if (isMergeableObject(target)) {
//     Object.keys(target).forEach(function (key) {
//       destination[key] = cloneIfNecessary(target[key], optionsArgument)
//     })
//   }
//   Object.keys(source).forEach(function (key) {
//     if (!isMergeableObject(source[key]) || !target[key]) {
//       destination[key] = cloneIfNecessary(source[key], optionsArgument)
//     } else {
//       destination[key] = deepMerge(target[key], source[key], optionsArgument)
//     }
//   })
//   return destination
// }

// function deepMerge(target, source, optionsArgument) {
//   var array = Array.isArray(source)
//   var options = optionsArgument || { arrayMerge: defaultArrayMerge }
//   var arrayMerge = options.arrayMerge || defaultArrayMerge

//   if (array) {
//     return Array.isArray(target)
//       ? arrayMerge(target, source, optionsArgument)
//       : cloneIfNecessary(source, optionsArgument)
//   } else {
//     return mergeObject(target, source, optionsArgument)
//   }
// }

// deepMerge.all = function deepMergeAll(array, optionsArgument) {
//   if (!Array.isArray(array) || array.length < 2) {
//     throw new Error(
//       'first argument should be an array with at least two elements'
//     )
//   }

//   // we are sure there are at least 2 values, so it is safe to have no initial value
//   return array.reduce(function (prev, next) {
//     return deepMerge(prev, next, optionsArgument)
//   })
// }
