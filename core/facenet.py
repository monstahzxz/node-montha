# import core_utils as cu
import sys
import json

line = input()
dic = {
    1: '2',
    3: '4',
    'line': line
}
# print(line)
j_dic = json.dumps(dic)
print(j_dic)