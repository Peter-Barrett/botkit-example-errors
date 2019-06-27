const { BotkitConversation } = require('botkit');

/**
 *  
 *  This example triggers the following error: (node:89419) UnhandledPromiseRejectionWarning: TypeError: step.result.match is not a function 
 *  
 *  Side Note:
 *  In this example you can see that if you have many child dialogs the results of the previous get attached to the next dialogs results.
 *  This can create a massive response where in only the top level matters and the rest is redundant. It would make more sense to add child dialogs
 *  responses all at the root level of the response object e.g. 
 * 
 *  Current: child dialogs A,B,C,D
 *  Result:
 * { 
 *  A:
 *   { 
 *     A: 'as' },
 *  B:
 *   {
 *     A:
 *      { 
 *        A: 'as' },
 *     B: 'ds' },
 *  C:
 *   { 
 *     A:
 *      { 
 *        A: 'as' },
 *     B:
 *      { 
 *       A: [Object],
 *        B: 'ds' },
 *     C: 'asd' },
 *  D:
 *   { 
 *     A:
 *      { 
 *        A: 'as' },
 *     B:
 *      { 
 *        A: [Object],
 *        B: 'ds' },
 *     C:
 *      { 
 *        A: [Object],
 *        B: [Object],
 *        C: 'asd' },
 *     D: 'asd' } }
 * 
 * Preferred:
 *  {
 *   A: {
 *    result
 *   },
 *   B: {
 *    result
 *   },
 *   C: {
 *    result
 *   },
 *   D: {
 *    result
 *   },
 * }
 * 
 * 
 * 
 */
module.exports = function (controller) {

  if (controller.adapter.name === 'Web Adapter') {

    let conversationChildDialogs = new BotkitConversation('child_dialogs', controller);
    let conversationA = new BotkitConversation('A', controller);
    let conversationB = new BotkitConversation('B', controller);
    let conversationC = new BotkitConversation('C', controller);
    let conversationD = new BotkitConversation('D', controller);

    conversationChildDialogs.after(async (response) => {
      console.log(response)
      await bot.beginDialog('quick_replies');
    })

    controller.addDialog(conversationChildDialogs);
    controller.addDialog(conversationA);
    controller.addDialog(conversationB);
    controller.addDialog(conversationC);
    controller.addDialog(conversationD);

    conversationChildDialogs.addChildDialog('A');
    conversationChildDialogs.addChildDialog('B');
    conversationChildDialogs.addChildDialog('C');
    conversationChildDialogs.addChildDialog('D');

    conversationA.ask({
      text: ['A reply to me'],
    }, [
        {
          handler: async (response, convo, bot) => {
          }
        },], 'A');

    conversationB.ask({
      text: ['B reply to me'],
    }, [
        {
          handler: async (response, convo, bot) => {
          }
        },], 'B');

    conversationC.ask({
      text: ['C reply to me'],
    }, [
        {
          handler: async (response, convo, bot) => {
          }
        },], 'C');

    conversationD.ask({
      text: ['D reply to me'],
    }, [
        {
          handler: async (response, convo, bot) => {
          }
        },], 'D');

  }

}