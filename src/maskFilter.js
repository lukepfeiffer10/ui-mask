angular.module('ui.mask')
          .filter('uiMask', ['uiMaskConfig', function(uiMaskConfig) {
              var maskCaretMap, maskPlaceholder, maskComponents;

              return function(input, mask) {
                  var inputChars, maskedInputChars;

                  input = (input || '').toString();

                  processRawMask(mask);

                  inputChars = input.split('');
                  maskedInputChars = maskPlaceholder.split('');
                  angular.forEach(inputChars, function(char) {
                      maskedInputChars[maskCaretMap.shift()] = char;
                  });

                  return maskedInputChars.join('');
              };

              function processRawMask(mask) {
                  var characterCount = 0;

                  maskCaretMap = [];
                  maskPlaceholder = '';

                  if (angular.isString(mask)) {
                      var splitMask = mask.split('');

                      angular.forEach(splitMask, function(chr) {
                          if (uiMaskConfig.maskDefinitions[chr]) {
                              maskCaretMap.push(characterCount);

                              maskPlaceholder += '_';
                              characterCount++;
                          }
                          else {
                              maskPlaceholder += chr;
                              characterCount++;
                          }
                      });
                  }
                  // Caret position immediately following last position is valid.
                  maskCaretMap.push(maskCaretMap.slice().pop() + 1);

                  maskComponents = maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
              }
          }]);
