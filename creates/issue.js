const taigaHostUrl = process.env.TAIGA_URL;

module.exports = {
    key: 'issue',
  
    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Issue',
    display: {
      label: 'Create Issue',
      description: 'Creates a new issue.'
    },
  
    operation: {
      inputFields: [
        {key: 'name', required: true, type: 'string'},
        {key: 'directions', required: true, type: 'text', helpText: 'Explain how should one make the recipe, step by step.'},
        {key: 'authorId', required: true, type: 'integer', label: 'Author ID'},
        {key: 'style', required: false, type: 'string', helpText: 'Explain what style of cuisine this is.'},
      ],
      perform: (z, bundle) => {
        const promise = z.request({
          url: taigaHostUrl + '/api/v1/issues',
          method: 'POST',
          body: JSON.stringify({
            name: bundle.inputData.name,
            directions: bundle.inputData.directions,
            authorId: bundle.inputData.authorId,
            style: bundle.inputData.style,
          })
        });
  
        return promise.then((response) => JSON.parse(response.content));
      },
  
      sample: {
        id: 1,
        createdAt: 1472069465,
        name: 'Best Spagetti Ever',
        authorId: 1,
        directions: '1. Boil Noodles\n2.Serve with sauce',
        style: 'italian'
      },

      outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'createdAt', label: 'Created At'},
        {key: 'name', label: 'Name'},
        {key: 'directions', label: 'Directions'},
        {key: 'authorId', label: 'Author ID'},
        {key: 'style', label: 'Style'}
      ]
    }
  };