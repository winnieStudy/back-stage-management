let arr = [
  {
      "buildingNum": "1",
      "communityId": "434619990400303105",
      "communityName": null,
      "createTimeStr": "2022-07-16 12:14:46",
      "doorNumber": "1212",
      "houseAmount": 1468944,
      "houseArea": "1212",
      "houseTotalAmount": 1468944,
      "id": "434620304161505281",
      "isDelete": 0,
      "isHaveToolRoom": false,
      "roomTypeId": "434620000081281025",
      "roomTypeName": "A户型",
      "toolRoomAmount": null,
      "toolRoomArea": "",
      "toolRoomUnitPrice": "",
      "unitPrice": "1212",
      "updateTimeStr": "2022-07-16 12:14:46"
  },
  {
      "buildingNum": "1",
      "communityId": "434619990400303105",
      "communityName": null,
      "createTimeStr": "2022-07-16 12:08:56",
      "doorNumber": "131",
      "houseAmount": 1723969,
      "houseArea": "1313",
      "houseTotalAmount": 1723969,
      "id": "434620212524351489",
      "isDelete": 0,
      "isHaveToolRoom": false,
      "roomTypeId": "434620000081281025",
      "roomTypeName": null,
      "toolRoomAmount": null,
      "toolRoomArea": "",
      "toolRoomUnitPrice": "",
      "unitPrice": "1313",
      "updateTimeStr": "2022-07-16 12:08:56"
  },
  {
      "buildingNum": "8",
      "communityId": "434624208205250561",
      "communityName": null,
      "createTimeStr": "2022-07-16 16:24:56",
      "doorNumber": "8#310",
      "houseAmount": 610000,
      "houseArea": "122",
      "houseTotalAmount": 700000,
      "id": "434624239005073409",
      "isDelete": 0,
      "isHaveToolRoom": true,
      "roomTypeId": "434624224347553793",
      "roomTypeName": "三室两厅",
      "toolRoomAmount": 90000,
      "toolRoomArea": "20",
      "toolRoomUnitPrice": "4500",
      "unitPrice": "5000",
      "updateTimeStr": "2022-07-18 01:19:50"
  }
]

let b = arr.filter((item, index) => {
    if(index !== arr.length - 1 ) {
        return arr[index].communityId === arr[index + 1].communityId
    } else {
        return arr[index].communityId === arr[arr.length - 1].communityId
    }
})
console.log(b)