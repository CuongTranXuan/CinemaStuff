---
title: Fcinema API Docs

toc_footers:
  - <a href='#'>Created by Cuongtx3</a>

search: true

---

# Introduction

Welcome to the Fcinema API!

# Route /api/user

## Authenticate

### HTTP Request

`POST /api/user/authenticate`

### Data Params

Parameter | Description
--------- | ----------- 
username | provided admin/editor username 
password | provided password 

### Success Response
  * Code: 200
  * Content:  `{ id: 1,  username: bob,  role: admin, accessToken: token, requireQR: true/false}`

### Error Response
  * Code: 401 UNAUTHORIZED
  * Content: `{accessToken: null,  message: "Invalid Username / Password!"}`

  OR

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Register 

this endpoint is protected and only be used by admin account

### HTTP Request 

`POST /api/user/register`

### Custom Header

`x-access-token: your usable token` 

`x-user-id: admin account's id for identifing role`


### Data Params

Parameter | Description
--------- | ----------- 
username | new username 
password | strong enough password 
role | choose to create new admin or editor account

### Success Response
  * Code: 200
  * Content: `{message:'registered'}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Get All User 

this endpoint will send all current accounts information, password field is hashed

### HTTP Request

`GET /api/user`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### Success Response 
  * Code: 200
  * Content: A JSON list with all information of every accounts 

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Update an User

this endpoint is used to update information about an account, only used by admin

### HTTP Request

`PUT /api/user/:id`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### URL Params 

  * Required: `id = [String]`
### Data Params

Parameter | Description
--------- | -----------
username | username of the account wanted to update 
password | new password
role | new role 

### Success Response
  * Code: 200
  * Content: `{message:"updated successfully"}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Delete an User

this endpoint is used to delete an account, only used by admin

### HTTP Request

`DELETE /api/user/:id`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### URL Params 

  * Required: `id = [String]`

### Success Response
  * Code: 200
  * Content: `{message:"deleted successfully"}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Get QR code image

this endpoints will return a 2-factor authenticate QR image, must login before use

### HTTP Request 

`GET /api/user/qrcode/:id`

### Custom Header

`x-access-token: your accessToken` 


### URL Params 

  * Required: `id = [String]`

### Success Response

  * Code: 200
  * Content: a Base64 image

### Error Response
  * Code: 404 NOT FOUND

  OR

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Create QR code 

this endpoint will generate a 2-factor authenticate QR image for the first time using or when user want to reset QR code

### HTTP Request

`POST /api/user/qrcode`

### Custom Header

`x-access-token: your accessToken` 

### Data Params

Parameter | Description
--------- | ----------- 
username | the username wants to create QR code

### Success Response
  * Code: 200
  * Content: `{message: "qr generated", qrcode: Base64 image}`

### Error Response
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Validate 2-factor authentication

this endpoint will check 6-digit code user submit and account's secret to perform authentication, login with password before call this endpoint

### HTTP Request

`POST /api/user/qrcode/validate`

### Custom Header

`x-access-token: your accessToken` 

### Data Params

Parameter | Description
--------- | ----------- 
username | the username wants to authenticate
code | 6-digit code provided on Google Authentication app

### Success Response
  * Code: 200
  * Content: `{message: "code valid", authenticated: true}`

### Error Response
  * Code: 403 FORBIDDEN
  * Content: `{message: "code invalid", authenticated: false}`

  OR

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

# Route /api/film

This route is used to serve public watching film web

## Get All Film

This endpoint will return information about every films available in database

### HTTP Request 

`GET /api/film`

### URL Params

none

### Success Response 

  * Code: 200
  * Content: A JSON string contains informations about all the films

### Error Response 

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Get Film Info 

this endpoint return info by searching film's id

### HTTP Request 

`GET /api/film/:id`

### URL Params 

  * Required: `id=[String]`

### Success Response 

  * Code: 200
  * Content: 

Field | Type | Example
----- | ---- | -------
id | String | fate_ep20
title | String | Fate Grand Order: Absolute Demonic Front Babylonia Ep 20
adult | Boolean | false
trailer_link | String | youtube.com
video_link | String | example.com
poster_link | String | imgur.com
release_date | String | 20/2/2020
overview | String | lorei ipsum.... 
original_title | String | Fate grand Order: Zettai Majuu Sensen Babylonia 
original_language | String | jap
vote_average | Number | 10.0
poster_link | String | imgur.com

### Error Response 

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

# Route /api/admin

this route requires account login, some endpoint even requires admin's privilege

## Get Film List 

this endpoint return a list film available in database, require authentication

### HTTP Request 

`GET api/admin`

### Custom Header

`x-access-token: your accessToken` 

### URL Params 

none

### Success Response 

  * Code: 200
  * Content: A JSON string contains informations about all the films

### Error Response 

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Create New Film

this endpoint creates a new entry for new film and saves to database, require admin's privilege

### HTTP Request 

`POST /api/admin/films/create`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### URL params 

none

### Data Params

  * Content-type: application/json 
  * Content: film informations, like above 

### Success Response 

  * Code: 200
  * Content: `{result:'new film has been added to database'}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Delete a Film 

this endpoint will remove a film from database, admin's privilege required

### HTTP Request

`DELETE /api/admin/films/:id`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### URL params

  * Required: `id=[String]`

### Success Response 

  * Code: 200
  * Content: `{result:'deleted'}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Update a Film

this endpoint is used for updating a film and save to database, admin's privilege required

### HTTP Request

`PUT /api/admin/films/:id`

### Custom Header

`x-access-token: your admin accessToken` 

`x-user-id: admin account's id for identifing role`

### URL params

  * Required: `id=[String]`

### Data params

  * Content-type: application/json 
  * Content: film informations, like above 

### Success Response 

  * Code: 200
  * Content: `{result: 'updated'}`

### Error Response 
  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error : error message}`

## Upload Film 

this endpoint is used for uploading film to server, only support video/x-matroska (.mkv) file, login required

### HTTP Request 

`POST /api/admin/upload_video`

### Custom Header

`x-access-token: your admin accessToken` 

### URL params 

none

### Data params 

  * Content-type: multipart/form-data
  * Limit size file : 30000MB

### Success Response

  * Code: 200
  * Content: `{video: 'uploaded',filename: filename}`

### Error Response
 
  * Code: 400 BAD REQUEST
  * Content: `{error: 'not a valid mkv file'}`

## Upload Subtitle 

this endpoint is used for uploading subtitle to server, only support text/vtt (.vtt) file, login required

### HTTP Request 

`POST /api/admin/upload_sub`

### Custom Header

`x-access-token: your admin accessToken` 

### URL params 

none

### Data params 

  * Content-type: multipart/form-data

### Success Response

  * Code: 200
  * Content: `{sub: 'uploaded',filename: filename}`

### Error Response
 
  * Code: 400 BAD REQUEST
  * Content: `{error: 'not a valid vtt file'}`

## Encode Film

this endpoint will let server encode a valid HLS stream and provide a valid link from video and subtitle uploaded before, login required

### HTTP Request 

`POST /api/admin/encode`

### Custom Header

`x-access-token: your accessToken` 

### URL params

none

### Data params

  * Content-type: Application/json 
  * Content: 

Parameter | Description
--------- | -----------
videoFile | uploaded .mkv file 
subFile | uploaded .vtt file
fileName | name of the HLS stream after encode 

### Success Response 

  * Code: 200
  * Content: `{result: 'encoded'}`

### Error Response 

  * Code: 500 INTERNAL SERVER ERROR
  * Content: `{error: error message}`

# Route /api/statistic

this route is about counting the number of concurrents, total watch times of a film and other diagnostic data (plan)

## Get Number of Current Watching 

this endpoint using Server-Sent Event (SSE) for regularly update data to dashboard

### HTTP Request 

`GET /api/statistic/init`

### Custom Header 

`x-access-token: your accessToken`

### URL params

none

### Response 

  * Content-type: text/event-stream
  * Connection: keepalive
  * Cache-Control: no-cache
  * Access-Control-Allow-Origin: `*`
  * Code: 200
  * Content: 

Field | Description 
----- | -----------
filmId | id of the film 
concurrent | number of user watching the film 

## Start Play a Film 

this endpoint is called when a new user start playing a film, Response is sent via SSE to dashboard

### HTTP Request 

`GET /api/statistic/play/:id`

### URL params

  * Required: `id=[String]`

### Response 
  * SSE Response 

## A Film is Ended 

this endpoint is called when a new user stop playing a film, or close the web, Response is sent via SSE to dashboard

### HTTP Request 

`GET /api/statistic/end/:id`

### URL params

  * Required: `id=[String]`

### Response 
  * SSE Response 