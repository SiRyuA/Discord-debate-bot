const Discord = require('discord.js');
const client = new Discord.Client();

let debateList = [
  "주제1",
  "주제2",
  "주제3",
  "주제4",
  "주제5",
];

let work = 0;
let timer1, timer2, timer3;

function Random(min, max) {
  return Math.floor(Math.random()*(max-min));
}

client.on('ready', () => {
  console.log('Develoid Debate bot Start!');
});

client.on('message', message => {
  let command = message.content;
  let guildMember = message.member;

  if(command.indexOf("!진행순서") != -1) {
    if(work == 0) {
      let num = Random(0, debateList.length);
      console.log("Get order");
      if(num % 2 == 0) message.reply("\n높은 숫자부터 진행하시면 됩니다.");
      else message.reply("\n낮은 숫자부터 진행하시면 됩니다.");

    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!번호") != -1) {
    if(work == 0) {
      let num = Random(0, debateList.length);
      console.log("Get number");
      message.reply("\n당신의 번호는 "+num+"입니다!");
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!주제") != -1) {
    if(work == 0) {
      let num = Random(0, debateList.length);
      console.log("Get subject");
      message.reply("\n이번 주제는\n'"+debateList[num]+"'\n입니다!");
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!준비") != -1) {
    if(work == 0) {
      work = 1;
      let num = Random(0, debateList.length);
      console.log("Preparation time start");
      message.reply("준비시간 1분 가지도록 하겠습니다.");
      timer1 = setTimeout(function() {
        console.log("Preparation time last 30 seconds");
        message.reply("준비시간이 30초 남았습니다.");
      }, 30000);
      timer2 = setTimeout(function() {
        console.log("Preparation time finished");
        message.reply("준비시간이 끝났습니다.");
        work = 0;
      }, 60000);
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!입론") != -1) {
    if(work == 0) {
      work = 1;
      let num = Random(0, debateList.length);
      console.log("Argumentation time start");
      message.reply("님 입론을 시작합니다. (1분)");
      timer1 = setTimeout(function() {
        console.log("Argumentation time last 30 seconds");
        message.reply("님 입론 시간이 30초 남았습니다.");
      }, 30000);
      timer2 = setTimeout(function() {
        console.log("Argumentation time finished");
        message.reply("님 입론 시간이 끝났습니다. 10초 후 발원권을 회수합니다.");
        work = 0;
      }, 60000);
      timer3 = setTimeout(function() {
        let role = message.guild.roles.find("name", "발언자");
        message.member.removeRole(role.id).catch(err => console.log(err));
        message.reply("님 발언권을 회수합니다.");
      }, 70000);
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!주도토론") != -1) {
    if(work == 0) {
      work = 1;
      let num = Random(0, debateList.length);
      let role1 = message.guild.roles.find("name", "참여자");
      let role2 = message.guild.roles.find("name", "발언자");
      console.log("Led discussion time start");
      message.reply("님 주도토론을 시작합니다. (3분 30초)");
      message.guild.members.filter(m=> m.roles.has(role1.id)).forEach(m => m.addRole(role2.id));
      timer1 = setTimeout(function() {
        console.log("Led discussion time last 30 seconds");
        message.reply("님 주도토론 시간이 30초 남았습니다.");
      }, 180000);
      timer2 = setTimeout(function() {
        console.log("Led discussion time finished");
        message.reply("님 주도토론 시간이 끝났습니다. 10초 후 발원권을 회수합니다.");
        work = 0;
      }, 210000);
      timer3 = setTimeout(function() {
        message.guild.members.filter(m=> m.roles.has(role1.id)).forEach(m => m.removeRole(role2.id));
        message.reply("모든 발언권을 회수합니다.");
      }, 220000);
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!최종변론") != -1) {
    if(work == 0) {
      work = 1;
      let num = Random(0, debateList.length);
      console.log("Final argument time start");
      message.reply("님 최종변론을 시작합니다. (1분)");
      timer1 = setTimeout(function() {
        console.log("Final argument time last 30 second");
        message.reply("님 최종변론 시간이 30초 남았습니다.");
      }, 30000);
      timer2 = setTimeout(function() {
        console.log("Final argument time finished");
        message.reply("님 최종변론 시간이 끝났습니다. 10초 후 발원권을 회수합니다.");
        work = 0;
      }, 60000);
      timer3 = setTimeout(function() {
        let role = message.guild.roles.find("name", "발언자");
        message.member.removeRole(role.id).catch(err => console.log(err));
        message.reply("님 발언권을 회수합니다.");
      }, 70000);
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }

  if(command.indexOf("!전체발언허용") != -1) {
    let role1 = message.guild.roles.find("name", "참여자");
    let role2 = message.guild.roles.find("name", "발언자");
    message.guild.members.filter(m=> m.roles.has(role1.id)).forEach(m => m.addRole(role2.id));
    console.log("All Talk");
  }

  if(command.indexOf("!일시정지") != -1) {
    let role = message.guild.roles.find("name", "발언자");
    message.guild.members.filter(m=> m.roles.has(role.id)).forEach(m => m.removeRole(role.id));
    console.log("Pause");
  }

  if(command.indexOf("!침묵") != -1) {
    let role = message.guild.roles.find("name", "발언자");
    message.member.removeRole(role.id).catch(err => console.log(err));
    message.reply("님께서 침묵 선언 하셨습니다.");
    console.log("Silence");
  }

  if(command.indexOf("!종료") != -1) {
    let role = message.guild.roles.find("name", "발언자");
    message.guild.members.filter(m=> m.roles.has(role.id)).forEach(m => m.removeRole(role.id));
    message.reply("님께서 발언을 종료하셨습니다.");
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    console.log("Stop");
    work = 0;
  }

  if(command.indexOf("!휴식") != -1) {
    if(work == 0) {
      work = 1;
      console.log("Rest time");
      message.reply("휴식시간 5분 가지도록 하겠습니다.");
      setTimeout(function() {
        console.log("Rest time last 4 minute");
        message.reply("휴식시간 시간이 4분 남았습니다.");
      }, 60000);
      setTimeout(function() {
        console.log("Rest time last 3 minute");
        message.reply("휴식시간 시간이 3분 남았습니다.");
      }, 120000);
      setTimeout(function() {
        console.log("Rest time last 2 minute");
        message.reply("휴식시간 시간이 2분 남았습니다.");
      }, 180000);
      setTimeout(function() {
        console.log("Rest time last 1 minute");
        message.reply("휴식시간 시간이 1분 남았습니다.");
      }, 240000);
      setTimeout(function() {
        console.log("Rest time last 30 second");
        message.reply("휴식시간 시간이 30초 남았습니다.");
      }, 270000);
      setTimeout(function() {
        console.log("Rest time finished");
        message.reply("휴식시간이 끝났습니다.");
        work = 0;
      }, 300000);
    } else if(work == 1) message.reply("다른 프로세스가 진행중입니다.");
  }
});

client.login('<<토큰>>');
