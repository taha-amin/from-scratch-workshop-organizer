import { checkAuth, deleteParticipant, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

function displayWorkshops(workshops) {
    //clear out workshopsEl
    workshopsEl.textContent = '';

    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        participantsEl.classList.add('participants');
        workshopEl.classList.add('workshop');

        nameEl.textContent = workshop.name;

        //for each of the workshop participants
            //make an element with the css class 'participant', and put that participants name in the text content
            //add an event listener to the participant el. On click, delete that participant, then refetch and redisplay all workshops
        //append this participantEl to the participantsEl

        for (let participant of workshop.participants) {
            //make an element with the css class 'participant', and put that participants name in the text content
            const participantEl = document.createElement('div');
            participantEl.classList.add('participant');
            participantEl.textContent = participant.name;

            //add an event listener to the participant el. On click, delete that participant, then refetch and redisplay all workshops
            participantEl.addEventListener('click', async () => {
                await deleteParticipant(participant.id);

                const updatedWorkshops = await getWorkshops();

                displayWorkshops(updatedWorkshops);
            });

            //append this participantEl to the participantsEl
            participantsEl.append(participantEl);
        }

        //append the participantsEl and nameEl to the workshopEl
        workshopEl.append(nameEl, participantsEl);

        //append the workshopEl to the workshopsEl
        workshopsEl.append(workshopEl);
    }
}

window.addEventListener('load', async () => {
    const workshops = await getWorkshops();

    displayWorkshops(workshops);
});