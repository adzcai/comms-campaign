import sys, re, datetime

assert len(sys.argv) > 1, "Please specify the name of your post!"

now = datetime.datetime.now()
name = sys.argv[1:].copy()

print(sys.argv[-1])
if sys.argv[-1] in ['md', 'html']:
  print(name)
  name = name[:-1]
  print(name)

name = " ".join(name)
file_name = now.strftime('%Y-%m-%d-') + re.sub(r"[-' !]", '-', name.lower())

if sys.argv[-1] in ['md', 'html']:
  file_name += '.' + sys.argv[-1]

elif not (file_name.endswith('.md') or file_name.endswith('.markdown') or file_name.endswith('.html')):
  file_name += '.md'

print(name)
print(file_name)
with open("./_posts/" + file_name, "w") as file:
  file.write('\n'.join([
    '---',
    'layout: post',
    'title: "' + name + '"',
    'date: ' + now.strftime("%Y-%m-%d %H:%M:%S -0600"),
    '---'
  ]))
