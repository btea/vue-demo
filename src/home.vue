<template>
    <section>
        <div>
            <router-link to='/app'>app</router-link>
            <router-link to="/game">game</router-link>
            <router-link to="/vuexs">vuexs</router-link>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    mounted: function(){
        console.log('监听');
    }
}
</script>
