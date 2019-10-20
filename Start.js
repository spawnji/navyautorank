// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjM1MzU5NDM3MDE1NzQ0NTMy.Xav9jQ.U7XVZEQWb-0QXNv6FOhejeobccw";

client.login(token)


var cookie = "6B2DF193C4E8CA9D5246E8CA498F654320A124F26BE9DD9770C5D0D60780656768D6955B2A6E1DD34B2B6BAC223E1E6C465737FBD4BF2A650A8C16CB226104F7661613F95BCC07D15C8089FAAD1F0FE29D7952B354858B200C749FBE06D1C332482C088D843FDF8235C33B8B8DCDFE8D825242C73234E1DFDE14F45191EADBDF407FE967BA7D3F9A20A9AD3CD307B8A9DB11FC5A9A7A9F7DAD77B3323B4238A5630517482555AE97F21D73F84BA36272292919DDB3E3A5D5F299ABA1C82A95E0E6E70302554CC50910F7A0EE75B494EBBFE6E0DAA081523C630343C752C32CD40E2424CE7A77E273B340EDEF753F32F3BD7CD5556FA362E3336373DB14940E51BA17FEC70577C77480E6B658B23BB14481FDCFAA3D792806738D191D6CFEEAD6CAA91F259065A10E283284DED6499ED1D8153018";
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