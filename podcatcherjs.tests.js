const test = require('tape')

const parseXml = require('./parse-xml.min')
const { buildItem, processChannel, processRSS, updateFeedDisplay } = require('./podcatcher')

const { data } = require('./test-xhr-response')
const { result } = require('./feed_fixture')

const beforeEach = require('tape')
const afterEach = require('tape')

test('after remote call test', (assert) => {
	const bx = parseXml(data)
	const rss = bx.children[0]
	const feed = processRSS(rss)

	assert.equal(feed.length, [result].length)
	assert.equal(JSON.stringify(feed).length, JSON.stringify([result]).length)

	const result_test = Object.assign({}, {image:result.image}, {media:result.media}, result)
	const feed_test = Object.assign({}, {image:feed[0].image}, {media:feed[0].media}, feed[0])

	assert.equal(JSON.stringify(feed_test), JSON.stringify(result_test))

	assert.end()
})

test('update feed display returns string', (assert) => {
	const feed = processRSS(parseXml(data).children[0])
	const updated_html = updateFeedDisplay([feed, feed])

	assert.ok(typeof(updated_html) === "string")
	assert.end()
})