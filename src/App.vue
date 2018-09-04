<template>
    <div class="app">this is a app</div>
</template>

<script>
export default {
    mounted: function(){
        var [a,b] = [1,2];
        console.log(a);
        console.log(b);
        var c = () => {
            console.log('this is a arrow function');
        }
        c();
    }
}
</script>


