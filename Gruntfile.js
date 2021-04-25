module.exports = function(grunt) {

    // 1. Всё конфигурирование тут
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'Frontend/src/*.js',
                    'Frontend/src/test/*.js'
                ],
                dest: 'Frontend/www/assets/js/main.js',
            }
        }

    });

    // 3. Здесь мы сообщаем Grunt, что мы планируем использовать этот плагин:
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 4. Мы сообщаем Grunt, что нужно делать, когда мы введём "grunt" в терминале.
    grunt.registerTask('default', ['concat']);

};