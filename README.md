# hashcode2k17

`yarn && npm run start`

Big files will crash by default because they got lines bigger than 4096 (default buffer size). Manually change the buffer size in linebyline module to make it work with all files (60k worked for us)
