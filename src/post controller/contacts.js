const {Contacts} = require('../modules');

const contactMsg = async (req, res)=> {
    try {
    await Contacts.create({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
    });
        res.send('<h2>Massage has sent successfully, we will get in touch with you soon</h2');   
    } catch (error) {
        res.send('On sending massage '+error);     
    }
}

const customerMsg = async (req, res)=> {
    try {
        if(!req.session || !req.session.user) { res.render('sign-in-up'); return; }
        if(!req.session.user.admin) { res.send('you are not authorised'); return; }

        let addAllMsg = await Contacts.find({});
        const allMsg = addAllMsg.map((msg)=> {
            const time = msg.createdAt.toISOString();
            msg.time = time.substring(0, 10)+' '+time.substring(11, 19);
            return msg;
        });
        res.render('customer-msg', {allMsg});
    } catch (error) {
        res.send('on customer msg page', error);
    }
}

module.exports = {
    contactMsg,
    customerMsg,
}