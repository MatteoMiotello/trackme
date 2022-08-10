const jwtConfiguration = () => ({
    secret: process.env.JWT_SECRET
});

export default jwtConfiguration;