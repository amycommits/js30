when you reference an array it's just a copy!

so when you do:
const arr = [1,2,3,4]
const arr2 = arr

then

arr2[2] = 2

THEN

both of the arrays are updated, because it is only a reference...
