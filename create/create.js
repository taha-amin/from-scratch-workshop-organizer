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

window.addEventListener('load', async () => {
    //dynamically fill in the workshops dropdown from supabase
    //grab the select HTML element from the DOM
    const select = document.querySelector('select');

    //go get the workshops from supabase
    const workshops = await getWorkshops();

    //for each workshop
    //create an option tag
    //set the option's value and text content
    //and append the option to the select
    for (let workshop of workshops) {

        //create an option tag
        const option = document.createElement('option');

        //set the option's value and text content
        option.value = workshop.id;
        option.textContent = workshop.name;

        //append the option to the select
        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});