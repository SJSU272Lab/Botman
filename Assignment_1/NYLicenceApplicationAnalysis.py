
# coding: utf-8

# In[1]:

def set_hadoop_config(credentials):
    prefix = "fs.swift.service." + credentials['name']
    hconf = sc._jsc.hadoopConfiguration()
    hconf.set(prefix + ".auth.url", credentials['auth_url']+'/v3/auth/tokens')
    hconf.set(prefix + ".auth.endpoint.prefix", "endpoints")
    hconf.set(prefix + ".tenant", credentials['project_id'])
    hconf.set(prefix + ".username", credentials['user_id'])
    hconf.set(prefix + ".password", credentials['password'])
    hconf.setInt(prefix + ".http.port", 8080)
    hconf.set(prefix + ".region", credentials['region'])
    hconf.setBoolean(prefix + ".public", True)


# In[5]:

credentials_2 = {
  'auth_url':'https://identity.open.softlayer.com',
  'project':'object_storage_f962b5f8_4788_49ff_aa47_5e4673e53a2b',
  'project_id':'1b4094970a544940859cdd585d0f462c',
  'region':'dallas',
  'user_id':'cf7b734f80d54703bddedc60fe77bc33',
  'domain_id':'4212beab9a7f469391135e26f7219597',
  'domain_name':'1141491',
  'username':'admin_c68b1bc189f64a5099a7c50bfd7621dc0de4dbd2',
  'password':"""WX.Lkgg8z_Ud#P6l""",
  'filename':'License_Applications.csv',
  'container':'notebooks',
  'tenantId':'saa0-89a6bc0b359e28-b159885f0f89'
}


# In[6]:

credentials_2['name'] = 'keystone'
set_hadoop_config(credentials_2)


# In[41]:

from __future__ import division
import numpy as np

from pyspark.sql import SQLContext
sqlContext = SQLContext(sc)

# adding the PySpark modul to SparkContext
sc.addPyFile("https://raw.githubusercontent.com/seahboonsiew/pyspark-csv/master/pyspark_csv.py")
import pyspark_csv as pycsv

license = sc.textFile("swift://" + credentials_2['container'] + "." + credentials_2['name'] + "/License_Applications.csv")

def skip_header(idx, iterator):
    if (idx == 0):
        next(iterator)
    return iterator

license_header = collisions.first()


license_header_list = license_header.split(",")
license_body = license.mapPartitionsWithIndex(skip_header)

# filter not valid rows
license_body = license_body.filter(lambda line : len(line.split(","))>24)

# create Spark DataFrame using pyspark-csv
license_df = pycsv.csvToDataFrame(sqlContext, license_body, sep=",", columns=license_header_list)
#license_df.cache()


# In[44]:

license_df.printSchema()


# In[45]:

license_df.take(1)


# In[46]:

license_df.count()


# In[21]:

get_ipython().system(u'pip install --user seaborn')


# In[47]:

get_ipython().magic(u'matplotlib inline')

import matplotlib.pyplot as plt
# matplotlib.patches allows us create colored patches, we can use for legends in plots
import matplotlib.patches as mpatches
# seaborn also builds on matplotlib and adds graphical features and new plot types
import seaborn as sns
import pandas as pd


# In[48]:

license_pd = license_df[['Application ID', 'License Number', 'License Type', 'Application or Renewal',
                               'Business Name', 'Status', 'Start Date',
                               'End Date', 'License Category','Application Category','Building Number',
                               'Street','City','State','Zip','Contact Phone','Longitude','Latitude',
                               'Active Vehicles']].toPandas()


# In[49]:

license_pd.head(2)


# In[50]:

license_pd.tail(5)


# In[51]:

license_pd.describe()


# In[52]:

import requests, StringIO, pandas as pd, json, re
import matplotlib as plt
get_ipython().magic(u'matplotlib inline')

d = license_pd['License Type'].value_counts()
print d


# In[53]:

get_ipython().magic(u'matplotlib inline')

labels = d.keys()
i = 0
sizes = []
while i < len(d):
    sizes.append(d.get(labels[i]))
    i += 1
colors = ['yellowgreen', 'mediumpurple']
plt.pyplot.pie(sizes,              # data
        labels=labels,      # slice labels
        colors=colors,      # array of colours
        autopct='%1.1f%%',  # print the values inside the wedges
        shadow=True,        # enable shadow
        startangle=0       # starting angle
        ) 
plt.pyplot.axis('equal')
plt.pyplot.title('Percentage of license granted\n Business vs Individual\n\n')
plt.pyplot.show()


# In[55]:

d = license_pd['Status'].value_counts()
valList = []
for val in d.keys():
    valList.append(d[val])
plt.pyplot.bar(range(len(d)), valList, align='center')
plt.pyplot.xticks(range(len(d)), d.keys())
plt.pyplot.grid(True)
plt.pyplot.xlabel('Status')
plt.pyplot.ylabel('number of Licence')
plt.pyplot.title('Number of Licence Vs Licence Status\n')
plt.pyplot.show()


# In[56]:

license_pd['State'].value_counts()


# In[60]:

get_ipython().magic(u'matplotlib inline')
import colorsys

df = license_pd['License Category'].value_counts()
others=0
list ={}
for val in df.keys():
    if df[val] < 100:
        others = others + df[val]
    else:
        list[val] = df[val] 
list['others'] = others

labels = list.keys()
i = 0
values = []
while i < len(list):
    values.append(list.get(labels[i]))
    i= i+1

explode = []
for k in labels:
    explode.append(0.05)

HSV_tuples = [(x*1.0/i, 1, 1) for x in range(i)]
RGB_tuples = map(lambda x: colorsys.hsv_to_rgb(*x), HSV_tuples)

patches, texts = plt.pyplot.pie(values,colors= RGB_tuples, explode=explode, startangle=90, radius=1.2)
plt.pyplot.legend(patches, labels, loc='best', bbox_to_anchor=(-0.1, 1.),fontsize=12)
plt.pyplot.axis('equal')
plt.pyplot.title('Licence issued in different category\n')
plt.pyplot.show()


# In[61]:

#Application Status Distribution by Group

df1 = license_pd[['Application or Renewal','Status','State']]
counts = df1.groupby(['Application or Renewal','Status']).size();
counts


# In[64]:

import seaborn as sns
import matplotlib as plt

get_ipython().magic(u'matplotlib inline')

#adjust settings
sns.set_style("white")
plt.pyplot.figure(figsize=(15,10))

#create scatterplots
plt.pyplot.scatter(license_pd.Longitude, license_pd.Latitude, alpha=0.05, s=4, color='black')

#adjust more settings
plt.pyplot.title('Latitute and Longitude of Applicants Business Address\n\n', size=25)
plt.pyplot.xlim((-75,-72))
plt.pyplot.ylim((40.4,41))
plt.pyplot.xlabel('Longitude',size=20)
plt.pyplot.ylabel('Latitude',size=20)

plt.pyplot.show()


# In[ ]:



