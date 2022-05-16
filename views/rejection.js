module.exports = function (user) {
    return {
        to: [user['Employee Email Address']],
        bcc: ['randy.george@easysolar.org', 'muctarr.rahim@easysolar.org'],
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Rejected Request from ${user['Full Name']}`,
        text: 'Your Request Was Not Approved. ',
    }
}
