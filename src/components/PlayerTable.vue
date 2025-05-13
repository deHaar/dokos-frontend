<script setup lang="ts">

</script>

<template>
    <div>
        <h1>Spieler-Tabelle</h1>
    </div>
    <div>
        <table class="round-table">
            <tr>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Player 3</th>
                <th>Player 4</th>
                <th colspan="2">Game</th>
            </tr>
            <tr>
                <th>12</th>
                <th>6</th>
                <th>-10</th>
                <th>-8</th>
                <th>Value</th>
                <th>Bock</th>
            </tr>
            <tr>
                <td>2</td>
                <td>2</td>
                <td>-2</td>
                <td>-2</td>
                <td>2</td>
                <td>0</td>
            </tr>
            <tr>
                <td>6</td>
                <td>-6</td>
                <td>-6</td>
                <td>-2</td>
                <td>2</td>
                <td>0</td>
            </tr>
            <tr>
                <td>4</td>
                <td>-4</td>
                <td>-4</td>
                <td>-2</td>
                <td>2</td>
                <td>0</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.round-table td {
  text-align: center;
}

.round-table th {
    font-weight: bold;
}

.positive-value th, td {
    color: green;
}

.negative-value th, td {
    color: red;
}
</style>