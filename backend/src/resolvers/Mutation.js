const mutations = {
  async createItem(parent, args, context, info) {
    
    // TODO: check if user logged in

    const item = await context.db.mutation.createItem({
      data: {  
        ...args
      }
    }, info);

    return item;
  }
  // createDog(parent, args, context, info){
  //   // Create dog
  //   console.log('New dog')
  // },
};

module.exports = mutations;
 