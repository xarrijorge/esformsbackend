module.exports = function (user, req) {
    const reason = req.body.other || req.body.reason;
    return {
        to: [user['Employee Email Address']],
        bcc: 'request-tracker@easysolar.org',
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Rejected Request from ${user['Full Name']}`,
        text: `Your Request Was Not Approved of the following reason: ${reason}.`,
        html: `<h3><a href="${req.body.FILE}">THIS Request</a> Was Not Approved of the following reason: ${reason}.</h3>`,
    };
};
