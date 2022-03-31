import {
    createParticipants,
    getWorkshops,
    checkAuth,
    logout
} from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    //prevent default
    e.preventDefault();

    //get the participant name and workshop id from the form
    const formData = new FormData(form);

    const workshopId = formData.get('workshop-id');
    const name = formData.get('participant-name');

    //use createParticipants (which is from fetch-utils.js) to create a participant with this name and workshop id
    await createParticipants({
        name: name,
        workshop_id: workshopId,
    });

    form.reset();

    //after clicking SUBMIT redirect to main workshop page
    window.location.href = '../workshops';
});