const taigaHostUrl = process.env.TAIGA_URL;
const defaultResponse = require('../defaults/listProjects');

const fetchProjects = (z, bundle) => {
    const url = taigaHostUrl + '/api/v1/projects';

    return z.request(url)
      .then(response => JSON.parse(response.content));
  };

module.exports = {
    key: 'projects',
    noun: 'Project',
    display: {
      label: 'List of Projects',
      description: 'The project you want to automatically create issues in.',
      hidden: true
    },
    operation: {
      perform: fetchProjects,
      sample: defaultResponse.defaultListProjectsResponse,
      outputFields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' }
      ]
    }
  };