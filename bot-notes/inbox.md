# inbox

### Links
[Engineering Drawing Practices](https://ndiasqtorage.blob.core.usgovcloudapi.net/ndia/2008/technical/GastonEngineeringDrawings100G.pdf)

[[drive-motor-encoder-assembly|encoder]]

[[drive-motor-encoder-assembly]]

testing

```dataview
TABLE WITHOUT ID
eventDate, eventName
FROM csv("data.csv")
WHERE eventDate = date(2022-01-13)
```
```dataviewjs
const myData = await dv.io.csv("data.csv");
dv.table(["eventDate", "eventName"], myData)
```

## Drive System parts list
```dataview
TABLE WITHOUT ID
sub-assembly, component-type, description, wiki-link
FROM csv("parts-list-rev1.csv")
WHERE system = "drive"
```


