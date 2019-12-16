export default {
    'GET /api/page_layout/form': {
        name: 'Form',
        content: [
            {
                type: 'Form',
                uuid: '2200-3123-32314123',
                content: [
                    {
                        type: 'TextField',
                        uuid: 'textfield-2',
                        title: 'Title',
                        name: 'title'
                    },
                    {
                        type: 'TextArea',
                        uuid: 'text-area-1',
                        title: 'Description',
                        name: 'description'
                    },
                    {
                        type: 'FormActions',
                        uuid: 'form-actions-1',
                        content: [
                            {
                                type: 'SubmitButton', 
                                title: 'Submit',
                                uuid: 'submit-button-1'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    'POST /api/page_action': {
        result: 'ok'
    }
  };
  