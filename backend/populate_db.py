import pandas as pd

df = pd.read_csv('activities.csv', keep_default_na=False)
headers = ['Location', 'TITLE-Título', 'VOCABULARY- Vocabulario', 'GRAMMAR-Gramática', 'LEVEL-Nivel',
           'AUTHOR-Autor(a)', 'TECHNOLOGY USED-Tecnología', 'SKILLS-Destrezas']
df = df[headers][df['Location'].str.startswith('http', na=False)]  # ignore none-links and n/a's
rename_d = {n: n[:len(n) if '-' not in n else n.index('-')].replace(' ', '_').lower() for n in df.columns}
df = df.rename(columns=rename_d)

# duplicate for case-insensitive search
for col in df.columns:
    if col == 'location':
        continue
    search = "_search_" + col
    df[search] = df[col].str.lower()


df.to_csv('out.csv', index=False)

import boto3

dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")


def recreate_table():
    import json
    with open('db.json', 'r') as fp:
        params = json.load(fp)

    # create GSIs
    # cols = df.columns
    # params.update({
    #     "LocalSecondaryIndexes": [
    #         {
    #             "IndexName": "cool_index",
    #             "KeySchema": [
    #                 {
    #                     "AttributeName": col,
    #                     "KeyType": "HASH"
    #                 } for col in cols
    #             ],
    #             "Projection": {
    #                 "ProjectionType": "ALL"
    #             },
    #             # "ProvisionedThroughput": {
    #             #     "ReadCapacityUnits": 1,
    #             #     "WriteCapacityUnits": 1
    #             # }
    #         }
    #     ]
    # })
    # if not params['AttributeDefinitions']:
    #     params['AttributeDefinitions'] = []
    # params['AttributeDefinitions'].extend([
    #     {"AttributeName": col, "AttributeType": "S"} for col in cols
    # ])

    print(params)
    try:
        dynamodb.Table('MainTable').delete()
    except:
        print("Table non-existent")
    dynamodb.create_table(**params)
    return params


params = recreate_table()
items = df.to_dict(orient='records')
table = dynamodb.Table('MainTable')
for i, d in enumerate(items):
    d['id'] = str(i)
    table.put_item(Item=d)
