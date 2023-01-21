# Scholar Power
A repository hosting the frontend code for the Scholar Power application. Deployed site can be found on: https://deft-torte-4578e5.netlify.app/.
## Getting Started

### Getting a copy of the code
1. Set up Git on your machine.
    - Some information on how to set up can be found [here](https://docs.github.com/en/get-started/quickstart/set-up-git).
2. Clone the repository to your local machine.
    - If using SSH: `git clone git@github.com:MoistCode/scholar-power.git`
    - If using HTTPS: `git clone https://github.com/MoistCode/scholar-power.git`

### Getting a development server running
1. In the terminal, navigate into the cloned repository.
2. Run `npm i` to install dependencies.
   - If an error stating that `npm` isn't installed, look into [installing Node.js](https://nodejs.org/en/download).
3. Run `ionic serve`.
   - If an error comes up, the Ionic CLI may been to be installed using `npm install -g @ionic/cli cordova-res`.
4. Now a local development server of the code is ready. Navigate to `http://localhost:8100/` in a browser to get started.

### Starting on a new feature, bug fix, etc...
1. Ensure you're on the main branch by running `git checkout main`.
2. Get the latest work from the main branch by running `git fetch origin && git merge --ff-only origin/main`.
3. Checkout a feature branch by running `git checkout -b WHATEVER-YOU-WANT-TO-NAME-YOUR-BRANCH`.
   - For example, `git checkout -b adding-readme`.
4. Add and commit your work as needed.

### Pushing a feature to the main branch
1. When ready, push your branch by running `git push origin WHATEVER-YOUR-BRANCH-NAME-IS`.
   - For example, `git push origin adding-readme`.
2. After pushing, create a pull request. This can be done easily after pushing your feature branch. There is a prompt after pushing that states: `Create a pull request for 'YOUR-BRANCH-NAME' on GitHub by visiting:` followed by a link. Head to that link to create a pull request. Pull requests must be approved before pushing the work to the main branch. Another way to do this is to navigate to `https://github.com/MoistCode/scholar-power` in the browser which may show a green "compare & pull request" button.
