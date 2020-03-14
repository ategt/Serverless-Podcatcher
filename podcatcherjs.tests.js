const test = require('tape')

const parseXml = require('./parse-xml.min')
const { buildItem, processChannel, processRSS, updateFeedDisplay } = require('./podcatcher')

const { getMockResponse } = require('./test-xhr-response')
const { getMockResponseObject } = require('./first-test')
const { result } = require('./feed_fixture')

const beforeEach = require('tape')
const afterEach = require('tape')

test('after remote call test', (assert) => {
	const bx = parseXml(getMockResponse())
	const rss = bx.children[0]
	const feed = processRSS(rss)

	assert.equal(feed.length, [result].length)
	assert.equal(JSON.stringify(feed).length, JSON.stringify([result]).length)

	const result_test = Object.assign({}, {image:result.image}, {media:result.media}, result)
	const feed_test = Object.assign({}, {image:feed[0].image}, {media:feed[0].media}, feed[0])

	assert.equal(JSON.stringify(feed_test), JSON.stringify(result_test))

	assert.end()
})

// test('update feed display returns string', (assert) => {
// 	const feed = processRSS(parseXml(getMockResponse()).children[0])
// 	const updated_html = updateFeedDisplay([feed, feed])

// 	assert.ok(typeof(updated_html) === "string")
// 	assert.end()
// })

test('something about this was failing before', (assert) => {
	const rss_document = parseXml(getMockResponse())
	let feed = processRSS(rss_document.children[0])[0]
	assert.ok(typeof(feed) === "object")
	assert.end()
})

test('something about this was failing before', (assert) => {
	const responses = getMockResponseObject()

	for (let feed_url of JSON.stringify(responses).match(/\"([^\"]+)\":/g).map(match => match.replace(/\":/g,"").replace(/\"/g,""))) {
		const data = responses[feed_url]
		const rss_document = parseXml(data)
		const feed = processRSS(rss_document.children[0])[0]
		assert.ok(typeof(feed) === "object")
	}

	assert.end()
})