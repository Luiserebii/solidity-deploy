#!/bin/bash

#
# Main deployment script; this calls main-deploy.js, and executes these in order. A hacky solution to bring order to chaos
#

headline () {
  # ANSI Escape Code styling
  border="\e[1;96m=========================="
  echo -e $border
  echo -e "Addition: $1 + $2 = $3"
  echo -e $border
  # Reset coloring
  echo -e "\e[0m"
}

split() {
  echo "Delimiter passed: $1" 
  IFSSAVE=IFS
  IFS="$1"
  output=($output)
  # Reset IFS
  IFS=$IFSSAVE
}

main="./main-script.js"

a=0
b=1

# node output:
# 
# Node.js script
# ===============
# A: [Value of A passed]
# B: [Value of B passed]
# C: [A + B]


# Read output, loop for C value
output=$(node $main -a $a -b $b)
# Call split with \n, which will take output and cut it for us
split $'\n'

for i in "${output[@]}"; do # access each element of array
  if [[ $i == *"C:"* ]]; then
    echo "We found \"C:\"!"
    echo "$i"
    line=$i
  fi
done


#Take our selected line, split it again, and grab the second half...
output=$line
split ":"

#Finally, trim...
c=${output[1]}
c=c | xargs

# Print in BASH as well
headline $a $b $c

# Take B and C, and funnel it back into node


echo "end of script"

##########################


