// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjM1MzU5NDM3MDE1NzQ0NTMy.XawUcQ.KiF7jT-rahVIcBO14AaQsURGn0o";

client.login(token)


var cookie = "95609CA019D7A335FC1DBD73B1E9339974CA9C72C9EA8A1529C0FD22073F9DA5CC8447F36D577A27D53162DB834B0B027DD5FECF3ED3003382951A211222E512F094E598403C12293CF0E3AF8871FE8E68C3772C64F4E07DE0D062D24A0810B7B8E1632857AEA3623C2B0C97EB8DB373B5306258D9CE35DA1368DD77AC3921DD51B8478FB0F603166822C411DB5481B205B452631A2C3D30F2EE9FF8D54EF01E5F9DA3E4B0F3C5DF8D28FC32708E1ADBE3C51BC56F82DE79466E07DFA204A9C5BB1DD9800245AED6913D33B0D985DEF880EA491CD18F69B96B58A745ACF07F8A50B5B667BEA7E1C94EF12912E39BAD1074A1E88FEF35BBA621C46ADE52F79B958A3F62DD4C3190FF134D3FEA7A0EC60EA21023A152AF932CE344F267C65E710999773DBBA2E39A8A937262337DA82553C6AA1746";
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
