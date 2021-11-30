<template>
	<v-container style="max-width: 1200px" fluid>
		<v-alert type="error" border="left" class="ma-4">
			{{ $route.path + '존재하지 않는 경로입니다.' }}
		</v-alert>
	</v-container>
</template>
