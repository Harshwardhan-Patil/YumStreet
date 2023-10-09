function log(target, key, descriptor) {
   const originalMethod = descriptor.value;

   descriptor.value = function (...args) {
      const result = originalMethod.apply(this, args);
      if (process.env.NODE_ENV !== 'production') {
         console.log('filePath: ' + __filename);
         console.log(`Calling method ${key} with arguments:`, args);
         console.log(`Method ${key} returned:`, result);
      }
      return result;
   };

   return descriptor;
}

export { log };
