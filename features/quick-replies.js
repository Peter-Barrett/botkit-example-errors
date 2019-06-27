const { BotkitConversation } = require('botkit');


/**
 *
 *  This example will show this error: (node:88627) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'state' of undefined
 * 
 *  To replicate, start the conversation and refresh the page. It can happen randomly so just reply to the quick reply a couple of times
 *  and restart the server as needed, the error will show eventually. It seems to be storage related as it goes away if storage is turned off.
 *  But it does eventually happen with in memory storage too.
 * 
 *  This example will also show this error after slecting "Next Convo" multiple times in a row : TypeError: step.result.match is not a function
 * 
 */
module.exports = function (controller) {

  if (controller.adapter.name === 'Web Adapter') {

    let conversation = new BotkitConversation('quick_replies', controller);
    let conversation2 = new BotkitConversation('follow_on', controller);
    controller.addDialog(conversation);
    controller.addDialog(conversation2);

    conversation2.say('In new convo');

    conversation2.after(async (response, bot) => {
      await bot.beginDialog('quick_replies');
    })

    conversation.ask({
      text: ['Choose One'],
      channelData: {
        quick_replies: [
          {
            title: 'Next Convo',
            payload: 'follow_on',
          },
          {
            title: 'Child Dialogs',
            payload: 'child_dialogs'
          }
        ]
      }
    }, [
        {
          handler: async (response, convo, bot) => {
            await bot.beginDialog(response);
          }
        },], 'choice');
      
    
    controller.on('welcome_back', async (bot) => {
      console.log('back')
      await bot.beginDialog('quick_replies');
    })

    controller.on('hello', async (bot) => {
      await bot.beginDialog('quick_replies');
    })

  }

}