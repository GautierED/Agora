import loadContractsDb from '../../functions/loadContractsDb';

const About = () => {

    loadContractsDb();

    return(
        <div>
            About
        </div>
    );

};

export default About;