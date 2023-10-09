function asyncWrap(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
export default asyncWrap;

// decorator function
// function asyncWrap(target, key, descriptor) {
//   console.log(target);
//   console.log(key);
//   console.log(descriptor);
//   const originalMethod = descriptor.value;

//   descriptor.value = asyncHandler(originalMethod);

//   return descriptor;
// }
