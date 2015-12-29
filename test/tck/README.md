### Attempt to translate the JDK8/JSR-310 TCK Tests to ES6 mocha/chai

Each Test file from the TCK is transformed into a mocha test file with the following structure:

    describe('<fullPackageClassName of the TCK Test Class>'. () => {
        ...
        before()
        and other helper methods
        ...
        
        describe('<section name from the TCK Test Class>', () => {
        
            it('<test method name from the TCK Test Class>', () => {
                ...
            });
    
        });
    });

Using this structure we try to stay as close as possible to the TCK Tests. 
It might even be possible to generate the structure by parsing the TCK Source Files in the future 
(The actual test logic will very probably always need to be manually adapted)