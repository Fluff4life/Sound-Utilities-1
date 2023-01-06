const fs = require('fs');

module.exports = client => {
    const load_dir = dirs => {
        // Scanning the event dirs
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'))

        for (const event_file of event_files) {
            // requiring the event files
            const event = require(`../events/${dirs}/${event_file}`)
            //geting the event name
            const event_name = event_file.split('.')[0]
            client.on(event_name, event.bind(null, client))
        }
    }

    // passing the event dirs
    ['client', 'guild'].forEach(dir_name => {
        load_dir(dir_name)
    })
}