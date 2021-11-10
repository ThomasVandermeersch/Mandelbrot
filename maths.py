def mandelbrot(c):
  
  n = 30 # number of iteration
  i = 0

  while i < n :
    if i == 0 :
      z = c
    else : 
      z = (z*z)+c
      
  return z
  
