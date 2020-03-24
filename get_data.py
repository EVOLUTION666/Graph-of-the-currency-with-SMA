import requests
from datetime import datetime, timedelta, timezone
import xml.etree.ElementTree as ET
import json
import webbrowser

# get current time
now = datetime.now()
now_formatter = now.strftime("%d/%m/%Y")
now_str = str(now_formatter)
print ("Today's date: ", str(now_formatter))

#minus 10 years to current date
last_date = now - timedelta(days = 365 * 10)
last_date_formatter = last_date.strftime("%d/%m/%Y")
last_date_str = str(last_date_formatter)
print('Date before 10 years: ', last_date_formatter)

# get current data from Central Bank
url = 'http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=' + last_date_str + '&date_req2=' + now_str + '&VAL_NM_RQ=R01235'
print(url)

request = requests.get(url, allow_redirects=True)
open('cb.xml', 'wb').write(request.content)

# parse XML file
tree = ET.parse('cb.xml')
root = tree.getroot()

# all items data
print('Expertise Data:')

arrData = []

for elem in root:
   for subelem in elem:
       dateXml = elem.get('Date').split('.')
       dt = datetime(int(dateXml[2]), int(dateXml[1]), int(dateXml[0]))
       timestamp = dt.timestamp()
       valueXml = elem.find('Value').text.replace(',', '.')
       arrData.append([timestamp * 1000 , float(valueXml)])

# put data in JS file
dataJson = json.dumps(arrData)
content = 'window.data = ' + dataJson
open('data.js', 'w').write(content)

# open HTML file in browser
new = 2
urlExe = "index.html"
webbrowser.open(urlExe, new=new)
