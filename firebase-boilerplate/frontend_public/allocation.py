import csv
import json
tag_dict_1st ={}
tag_dict_1st["data"] = []
tag_dict_2nd ={}
tag_dict_2nd["data"] = []
tag_dict_3rd ={}
tag_dict_3rd["data"] = []
output = {}

with open('volunteers.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    list_of_rows = list(spamreader)

    for i in range(0,len(list_of_rows)):
        if i == 0:
            for field in list_of_rows[i]:
                if field == 'Name':
                    name_index = list_of_rows[i].index(field)
                if field == 'Tag_most_frequent':
                    tag_1st_index = list_of_rows[i].index(field)
                if field == 'Tag_2nd_frequent':
                    tag_2nd_index = list_of_rows[i].index(field)
                if field == 'Tag_3rd_frequent':
                    tag_3rd_index = list_of_rows[i].index(field)
                if field == 'Email ID':
                    email_index = list_of_rows[i].index(field)
        else:
            tag = {
                "name" : list_of_rows[i][name_index],
                "email" : list_of_rows[i][email_index],
                "tag" : list_of_rows[i][tag_1st_index]
            }
            tag_dict_1st["data"].append(tag)
            tag = {
                "name" : list_of_rows[i][name_index],
                "email" : list_of_rows[i][email_index],
                "tag" : list_of_rows[i][tag_2nd_index]
            }
            tag_dict_2nd["data"].append(tag)
            tag = {
                "name" : list_of_rows[i][name_index],
                "email" : list_of_rows[i][email_index],
                "tag" : list_of_rows[i][tag_3rd_index]
            }
            tag_dict_3rd["data"].append(tag)

event_tags = []
event_id = []
event_vacancy = []
with open('events.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    list_of_rows = list(spamreader)

    for i in range(0,len(list_of_rows)):
        if i == 0:
            for field in list_of_rows[i]:
                if field == 'Corresponding Tags':
                    tag_index = list_of_rows[i].index(field)
                if field == 'Event ID':
                    tag_ID = list_of_rows[i].index(field)
                if field == 'Vacancy':
                    tag_vacancy = list_of_rows[i].index(field)
        else:
            event_tags.append(list_of_rows[i][tag_index])
            event_id.append(list_of_rows[i][tag_ID])
            event_vacancy.append(list_of_rows[i][tag_vacancy])

for e_tag, e_id, e_vacancy in zip(event_tags, event_id, event_vacancy):
    output[e_id]=[]
    for item in tag_dict_1st["data"]:
        v_name = item['name']
        v_tag = item['tag']
        v_email = item["email"]
        # print(output[e_name])
        if (e_tag == v_tag) and (len(output[e_id]) < int(e_vacancy)):
            allocation = {
                "volunteer_name" : v_name,
                "volunteer_email" : v_email
            }
            output[e_id].append(allocation)

info_file = open("allocated.json",mode='w',encoding='utf8')
info_file.write(json.dumps(output, indent=4, ensure_ascii=False))
info_file.close()   
