const testController = {
    test: async (req, res) => {
        try {
            res.send("hello");
        } catch (error) {
            return null;
        }
    }

}

export default testController;