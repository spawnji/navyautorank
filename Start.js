// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjM1MzU5NDM3MDE1NzQ0NTMy.Xav9jQ.U7XVZEQWb-0QXNv6FOhejeobccw";

client.login(token)


var cookie = "F2F827334FBFD3370172778D3D84649D7634E24162241C79D8746D34D2F59CB9DF16918D3BE71AB8B919199D4AC5A8FDCF7B278D1C5E2BF479DBC439A8318FBFEFBA699A64D18940DAF7647AA2B1ABB8BB214A41EFE359EB668E76964EDECA126C22F7F2BBDFD1FDF5C80734E180BD74F5A732450344DD8C3C31C7E4CFFD52C6ECA212D94A63B98E3263F3344816";
var prefix = '!';
var groupId = 4854064;
var maximumRank = 14;

function login() {
	return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["General Officer"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("당신은 이 커맨드를 사용할 수 없습니다..");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("랭크를 입력해주세요.");
        if (username){
            message.channel.send(`플레이어가 그룹에 속해있는지 확인중입니다 ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id}의 랭크를 ${rankIdentifier}(으)로 변경이 불가능합니다.`)
                    } else {
                        message.channel.send(`${id}의 랭크를 ${rankIdentifier}(으)로 변경하였습니다.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`랭크가 변경되었습니다. 변경된 랭크 : ${rankIdentifier}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("랭크를 올리는 도중에 알 수 없는 오류가 발생하였습니다.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("그 플레이어는 그룹에 속해있지 않습니다.")
                });
            }).catch(function(err){
                message.channel.send(`오류 : ${username}이 플레이어는 계급을 올릴 수 있는 최대치에 속해있습니다.`)
           });
       } else {
           message.channel.send("유저이름을 입력해주세요.")
       }
       return;
   }
})
