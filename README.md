# domain stuff

a bunch of tools for domain names, such as domain lookup. now it is extended from just domain tools to any utility tools in general. sometimes i reimplement sensitive tools like encrypting for maximum security (if i made it myself, i 100% know its safe)

[the website](https://qaptivator.github.io/domain-stuff/)

# todo

- [ ] add key event tool to detect which key you pressed and give you a numeric keycode for js (https://www.toptal.com/developers/keycode)
- [ ] make a secure random password generator (so you can use it when your browser doesnt suggest one)
- [ ] fix the bug on mobile that when sometimes (maybe 100% of the time) when you enter the domain, it sends you to the last page immediately (currently encrypt/decrypt)
- [ ] remove `youtube download` page entirely and move the `best exetrnal tools` link to the end
- [ ] fix the bug where sometimes the google dns just refuses to work, maybe thrye temporary shadowbans/ratelimiting for too many requests?
- [ ] add darkmode (lol), and make the black favicon switch to white if your browser is using darkmode for better readability
- [ ] add a `what is my...` page which will show your ip, user agent, browser, platform, screen/window resolution and so on
- [ ] make a `PageTemplate.vue` component, which will encapsulate the header and paragraph beneath for every page
- [ ] possibly make a build for android (i also thought about putting my own blog here but thats too much, especially for a website like this)
- [ ] finish rppb (replicate prediction preview builder). for context, this was supposed to be an image card generator for image generations on replicate.com (the ai cloud platform). it was supposed to put some metadata like model name, maybe even prompt, and so on below the prediction, as well as the replicate logo itself. i dont think this idea is worth implementing, and its also quite painful to do in regular browser javascript, considering how bare most image editing libraries are.
- [x] fix domain lookup
- [x] finish ytdl (youtube download)
- [x] make external tools be fetched from github repository file (`external-tools.txt`)
